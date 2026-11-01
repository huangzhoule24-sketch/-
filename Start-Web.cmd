@echo off
setlocal
cd /d "%~dp0"
py -3 --version >nul 2>&1
if not errorlevel 1 (
  py -3 serve.py --open-browser
  goto done
)
python --version >nul 2>&1
if not errorlevel 1 (
  python serve.py --open-browser
  goto done
)
echo Python 3 is needed only for this local server.
echo Deploy the site online to let players use it without installing Python.
:done
pause
