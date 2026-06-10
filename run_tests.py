#!/usr/bin/env python3
"""
HAI Webpage - Automated Headless Test Runner
Runs the visual diagnostics suite using standard Python libraries and local browsers.
Zero dependencies required (no pip packages needed).
"""

import os
import sys
import json
import time
import argparse
import subprocess
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer

DEFAULT_PORT = 8081
test_results = None
server_should_stop = False

# Common browser installations on Windows
CHROME_PATHS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe")
]
EDGE_PATHS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe" # Fallback
]

def find_browser(requested_browser=None):
    if requested_browser == 'chrome':
        for path in CHROME_PATHS:
            if os.path.exists(path):
                return path
        return None
    elif requested_browser == 'edge':
        for path in EDGE_PATHS:
            if os.path.exists(path):
                return path
        return None
    
    # Auto-detect (Chrome preferred, then Edge)
    for path in CHROME_PATHS + EDGE_PATHS:
        if os.path.exists(path):
            return path
    return None

class TestResultsHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Suppress HTTP request logs to keep terminal output clean
        pass

    def do_POST(self):
        global test_results, server_should_stop
        if self.path == '/submit-results':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            test_results = json.loads(post_data.decode('utf-8'))
            
            # Send standard response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
            
            # Signal server to terminate
            server_should_stop = True
        else:
            self.send_response(404)
            self.end_headers()

    def translate_path(self, path):
        # Force serving from the workspace root (directory of this script)
        root_dir = os.path.dirname(os.path.abspath(__file__))
        translated = super().translate_path(path)
        rel = os.path.relpath(translated, os.getcwd())
        return os.path.join(root_dir, rel)

def run_server(port):
    server_address = ('', port)
    httpd = HTTPServer(server_address, TestResultsHandler)
    while not server_should_stop:
        httpd.handle_request()
    httpd.server_close()

def main():
    parser = argparse.ArgumentParser(description="Automated Headless Test Runner for HAI Webpage")
    parser.add_argument("--browser", choices=["chrome", "edge", "auto"], default="auto", help="Select browser to run tests in (default: auto)")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help=f"Port to run the test server on (default: {DEFAULT_PORT})")
    parser.add_argument("--timeout", type=int, default=30, help="Maximum seconds to wait for test completion (default: 30)")
    args = parser.parse_args()

    # Find the browser
    browser_path = find_browser(None if args.browser == "auto" else args.browser)
    if not browser_path:
        print("[ERROR] No compatible web browser found (Google Chrome or Microsoft Edge).")
        print("Please ensure Google Chrome or Microsoft Edge is installed in its default location.")
        sys.exit(1)

    print("="*60)
    print("         HAI RESERVATION WEB PAGE - AUTOMATED DIAGNOSTICS")
    print("="*60)
    print(f"[*] Starting local HTTP test server on port {args.port}...")
    
    # Start server thread
    server_thread = threading.Thread(target=run_server, args=(args.port,))
    server_thread.daemon = True
    server_thread.start()

    # Launch browser in headless mode
    browser_name = "Chrome" if "chrome.exe" in browser_path.lower() else "Edge"
    print(f"[*] Launching {browser_name} in headless mode...")
    
    cmd = [
        browser_path,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        f"http://localhost:{args.port}/tests.html?auto=true"
    ]
    
    browser_proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    print("[*] Running 9 test modules (resizing viewports, calculating pricing rules, DOM selection).")
    print("[*] Waiting for results...")

    # Wait for results
    start_time = time.time()
    while test_results is None:
        if time.time() - start_time > args.timeout:
            print("\n[TIMEOUT] Testing exceeded limit of 30 seconds.")
            break
        time.sleep(0.5)

    # Clean up browser process
    try:
        browser_proc.terminate()
        browser_proc.wait(timeout=2)
    except Exception:
        pass

    # Print results
    if test_results:
        results = test_results.get('results', [])
        passed_all = test_results.get('passed', False)
        
        print("\n" + "="*60)
        print("                    DIAGNOSTICS REPORT")
        print("="*60)
        
        passed_count = 0
        for r in results:
            status = "PASS" if r['passed'] else "FAIL"
            time_str = f"{r['duration']}ms"
            print(f"[{status}] | {r['name']} ({time_str})")
            if not r['passed']:
                print(f"         Error: {r.get('error')}")
                print(f"         Stack: {r.get('stack')}")
                print("-" * 60)
            else:
                passed_count += 1
        
        print("="*60)
        print(f"Summary: {passed_count} / {len(results)} passed.")
        print("="*60)
        
        if passed_all:
            print("Success: All diagnostics passed!")
            sys.exit(0)
        else:
            print("Failure: Some diagnostics did not pass.")
            sys.exit(1)
    else:
        print("[ERROR] No diagnostics data was received from the browser context.")
        sys.exit(1)

if __name__ == "__main__":
    main()
