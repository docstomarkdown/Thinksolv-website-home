#!/bin/bash

# Script to copy .env.local from Next.js project to current project

NEXTJS_PROJECT="/Users/vikram/GitHub/Thinksolv-website-home-next-js-latest"
CURRENT_PROJECT="/Users/vikram/GitHub/THinksolv_Minimal_home_new"
SOURCE_FILE="$NEXTJS_PROJECT/.env.local"
DEST_FILE="$CURRENT_PROJECT/.env.local"

echo "🔍 Looking for .env.local in Next.js project..."

if [ -f "$SOURCE_FILE" ]; then
    echo "✅ Found .env.local in Next.js project"
    echo "📋 Copying to current project..."
    
    # Copy the file
    cp "$SOURCE_FILE" "$DEST_FILE"
    
    # Convert Next.js env vars to Vite format if needed
    # Next.js uses NEXT_PUBLIC_ prefix, Vite uses VITE_ prefix
    if [ -f "$DEST_FILE" ]; then
        # Replace NEXT_PUBLIC_ with VITE_ for UTM mapping
        sed -i '' 's/NEXT_PUBLIC_UTM_SOURCE_MAP/VITE_UTM_SOURCE_MAP/g' "$DEST_FILE" 2>/dev/null || \
        sed -i 's/NEXT_PUBLIC_UTM_SOURCE_MAP/VITE_UTM_SOURCE_MAP/g' "$DEST_FILE" 2>/dev/null
        
        echo "✅ Successfully copied and converted .env.local"
        echo "📝 File location: $DEST_FILE"
        echo ""
        echo "⚠️  Note: If you see NEXT_PUBLIC_ variables, they've been converted to VITE_"
        echo "⚠️  Make sure to add PORT=3001 if it's not already there"
    else
        echo "❌ Failed to copy file"
        exit 1
    fi
else
    echo "❌ .env.local not found in Next.js project at: $SOURCE_FILE"
    echo ""
    echo "📝 Creating .env.local from template..."
    
    # Create from template
    cat > "$DEST_FILE" << 'EOF'
# AWS SES Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SOURCE_EMAIL=
AWS_TO_EMAIL=

# reCAPTCHA Configuration (Optional)
RECAPTCHA_SECRET_KEY=

# Server Configuration
PORT=3001

# UTM Source Mapping (Optional - JSON encoded)
# VITE_UTM_SOURCE_MAP={"custom_source": "Custom Subject"}
EOF
    
    echo "✅ Created .env.local template"
    echo "📝 Please fill in your AWS credentials and other values"
    echo "📝 File location: $DEST_FILE"
fi
