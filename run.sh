#!/bin/sh
/bin/sh -ec 'cd backend && source venv/bin/activate && python3 manage.py migrate && python3 manage.py runserver &'
/bin/sh -ec 'cd frontend && npm start'
