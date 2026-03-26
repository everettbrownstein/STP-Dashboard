@echo off
cd /d "%~dp0"
echo ========================================
echo  STP Dashboard Launcher
echo ========================================
echo.

:: Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python not found on this machine.
    echo.
    echo Please install Python from: https://python.org/downloads
    echo During install, check the box: "Add Python to PATH"
    echo Then run this file again.
    echo.
    pause
    exit /b
)

echo Python found. Starting server...
echo.
echo Dashboard will open at:
echo http://localhost:8765/STP_FY26_MA_Forecast_Dashboard_v22.html
echo.
echo DO NOT close this window - it keeps the server running.
echo When you are done, close this window to stop the server.
echo.

:: Open browser after 2 seconds
start "" /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:8765/STP_FY26_MA_Forecast_Dashboard_v22.html"

:: Start server (this keeps window open)
python -m http.server 8765
pause
