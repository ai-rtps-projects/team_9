from flask import Flask, request, jsonify
import json
import re
from datetime import datetime

app = Flask(__name__)

# Configure Flask to serve static files from the frontend build directory
# This is not strictly necessary if Vercel handles the frontend, but good for local testing
# app.static_folder = '../frontend/dist'
# app.static_url_path = '/'

# Configure Flask to look for templates in the frontend build directory
# This is not strictly necessary if Vercel handles the frontend, but good for local testing
# app.template_folder = '../frontend/dist'

# Load products
def load_products():
    with open('products.json', 'r') as f:
        return json.load(f)['products']

PRODUCTS = load_products()

class ChatbotEngine:
    def __init__(self, products):
        self.products = products

    def normalize_text(self, text):
        return text.lower().strip()

    def extract_budget(self, text):
        patterns = [
            r'under\s*\$?\s*(\d+)',
            r'(\d+)\s*-\s*(\d+)'
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                if len(match.groups()) == 1:
                    return (0, int(match.group(1)))
                else:
                    return (int(match.group(1)), int(match.group(2)))
        return None

    def detect_intent(self, text):
        text = self.normalize_text(text)

        if "compare" in text:
            return "compare"
        elif "budget" in text or "under" in text:
            return "price_search"
        elif "rating" in text:
            return "rating_search"
        elif "recommend" in text:
            return "recommend"
        else:
            return "search"

    def search_products(self, query, budget=None):
        results = self.products

        if budget:
            min_price, max_price = budget
            results = [p for p in results if min_price <= p['price'] <= max_price]

        return results

    def format_product(self, p):
        return f"{p['product_name']} (${p['price']}) ⭐ {p['rating']}"

    def generate_response(self, user_input):
        intent = self.detect_intent(user_input)
        budget = self.extract_budget(user_input)

        products = self.search_products(user_input, budget)

        if not products:
            return "No products found ❌"

        response = ""
        for p in products[:5]:
            response += "• " + self.format_product(p) + "\n"

        return response


chatbot = ChatbotEngine(PRODUCTS)


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    bot_response = chatbot.generate_response(user_message)

    return jsonify({
        'response': bot_response,
        'timestamp': datetime.now().isoformat()
    })


if __name__ == '__main__':
    app.run(debug=True)
