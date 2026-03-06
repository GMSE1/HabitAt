from config import app, db
from models import User, Habit, HabitLog
from routes.auth import auth_bp
from routes.habits import habits_bp
from routes.logs import logs_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(habits_bp, url_prefix="/api")
app.register_blueprint(logs_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(port=5555, debug=True)