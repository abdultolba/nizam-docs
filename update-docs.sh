#!/bin/bash

echo "🔄 Fetching latest nizam documentation from GitHub..."

# Run the documentation build process
npm run docs:build

if [ $? -eq 0 ]; then
    echo "✅ Documentation updated successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Test locally: npm run dev"
    echo "   2. Build for production: npm run build" 
    echo "   3. Deploy: npm run deploy"
    echo ""
    echo "🌐 The documentation is now synced with the latest version from:"
    echo "   https://github.com/abdultolba/nizam"
else
    echo "❌ Documentation update failed!"
    exit 1
fi
