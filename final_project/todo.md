Here are all the curl commands. Since you're on Windows, I'm using PowerShell-friendly syntax:

**Task 1 — Get all books:**
```bash
curl http://localhost:5000/
```

**Task 2 — Get book by ISBN:**
```bash
curl http://localhost:5000/isbn/1
```

**Task 3 — Get books by author:**
```bash
curl http://localhost:5000/author/Unknown
```

**Task 4 — Get books by title:**
```bash
curl "http://localhost:5000/title/Things Fall Apart"
```

**Task 5 — Get book review:**
```bash
curl http://localhost:5000/review/1
```

**Task 6 — Register a new user:**
```bash
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"testpass\"}"
```

**Task 7 — Login:**
```bash
curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"testpass\"}" -c cookies.txt
```

**Task 8 — Add a review (authenticated):**
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great book!" -b cookies.txt
```

**Task 9 — Delete a review (authenticated):**
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/1 -b cookies.txt
```

**Task 11 — Show GitHub fork info:**
```bash
curl https://api.github.com/repos/YOUR_GITHUB_USERNAME/expressBookReviews
```
Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

---

A few notes:
- The `-c cookies.txt` flag saves the session cookie on login, and `-b cookies.txt` sends it back for authenticated routes.
- If `curl` on your Windows machine doesn't support `-c`/`-b` cookie flags (the Windows built-in `curl.exe` does support them), you can use Postman instead for Tasks 7–9.
- For Task 10, you just submit the GitHub URL to your `general.js` file, e.g.: `https://github.com/YOUR_USERNAME/expressBookReviews/blob/main/final_project/router/general.js`