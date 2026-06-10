#!/usr/bin/env python3
"""
HAI Webpage - AI Visual Layout Audit & UX Testing Script
Uses the Gemini API to analyze a screenshot of the reservation webpage
and flag UI overlaps, spacing issues, and responsive styling errors.

Requirements:
  pip install google-generativeai pillow
Set environment variable:
  set GEMINI_API_KEY=your_api_key_here   (Windows Cmd)
  $env:GEMINI_API_KEY="your_api_key_here" (PowerShell)
"""

import os
import sys
from PIL import Image

try:
    import google.generativeai as genai
except ImportError:
    print("[ERROR] google-generativeai package is not installed.")
    print("Please install it using: pip install google-generativeai pillow")
    sys.exit(1)

# Prompt for UI analysis
AUDIT_PROMPT = """
You are an expert Frontend QA Engineer and UX/UI Designer. 
Analyze the provided screenshot of the Hmong Association, Inc (Arkansas) vendor booth reservation webpage.

Verify and report on the following checklist:
1. Layout Integrity: Are there any overlapping text layers, clipped buttons, or visual boundaries that are misaligned?
2. Mobile / Desktop breakages: Does the layout look balanced? If this is a mobile screenshot, is the 'Reserve Spot' form stacked above the directions card?
3. Color & Readability: Is there high contrast between the text and backgrounds? Are the booth category colors (White, Boba green, Food peach, Fruits blue, Info purple) readable with their numbers?
4. Polish & Visual appeal: Identify any 'wonky' alignment, excessive white space, or awkward wrapping.

Provide your feedback in a clean Markdown report with the following sections:
- Executive Summary (Pass/Fail/Needs Tweaks)
- Detailed Visual Anomalies (if any)
- Typography and Contrast Feedback
- Mobile/Responsive Layout Observations
- Actionable Recommendations for styles.css or index.html
"""

def main():
    # Check for API key
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("[WARNING] GEMINI_API_KEY environment variable is not set.")
        print("To run this audit, set the API key and run the script again:")
        print("  Windows Command Prompt:  set GEMINI_API_KEY=your_key")
        print("  Windows PowerShell:      $env:GEMINI_API_KEY=\"your_key\"")
        print("\nWe will look for a local screenshot to verify it exists...")

    # Look for screenshot in the directory
    screenshot_candidates = ["webpage.png", "screenshot.png", "iphone_mockup.png"]
    screenshot_path = None
    for candidate in screenshot_candidates:
        if os.path.exists(candidate):
            screenshot_path = candidate
            break

    if not screenshot_path:
        # Check parent folder or temp folders if any
        print("[ERROR] No screenshot file found in the current directory.")
        print(f"Please place a screenshot of the webpage named one of the following: {', '.join(screenshot_candidates)}")
        sys.exit(1)

    print(f"[*] Found screenshot: {screenshot_path}")
    
    if not api_key:
        print("[*] Local verification complete. Setup your GEMINI_API_KEY to execute the AI audit.")
        sys.exit(0)

    # Configure Gemini API
    print("[*] Connecting to Gemini API...")
    genai.configure(api_key=api_key)
    
    # Load image
    try:
        img = Image.open(screenshot_path)
    except Exception as e:
        print(f"[ERROR] Failed to load image: {e}")
        sys.exit(1)

    # Use gemini-1.5-flash for fast multimodal feedback
    print(f"[*] Sending screenshot '{screenshot_path}' to Gemini for UI/UX audit...")
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([AUDIT_PROMPT, img])
        
        print("\n" + "="*60)
        print("                 GEMINI AI VISUAL UI/UX AUDIT REPORT")
        print("="*60)
        print(response.text)
        print("="*60)
        
    except Exception as e:
        print(f"[ERROR] Gemini API request failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
