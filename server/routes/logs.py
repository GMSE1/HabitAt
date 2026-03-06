from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import db
from models import HabitLog, Habit
from datetime import date

logs_bp = Blueprint("logs", __name__)

@logs_bp.route("/habits/<int:habit_id>/logs", methods=["GET"])
@jwt_required()
def get_logs(habit_id):
    user_id = get_jwt_identity()
    habit = db.session.get(Habit, habit_id)

    if not habit or habit.user_id != int(user_id):
        return jsonify({"error": "Habit not found or unauthorized"}), 404

    logs = HabitLog.query.filter_by(habit_id=habit_id).all()
    return jsonify([l.to_dict() for l in logs]), 200


@logs_bp.route("/habits/<int:habit_id>/logs", methods=["POST"])
@jwt_required()
def create_log(habit_id):
    user_id = get_jwt_identity()
    habit = db.session.get(Habit, habit_id)

    if not habit or habit.user_id != int(user_id):
        return jsonify({"error": "Habit not found or unauthorized"}), 404

    today = date.today()
    existing = HabitLog.query.filter_by(habit_id=habit_id, date_logged=today).first()
    if existing:
        return jsonify({"error": "Habit already logged today"}), 409

    log = HabitLog(habit_id=habit_id, date_logged=today, completed=True)
    db.session.add(log)
    db.session.commit()
    return jsonify(log.to_dict()), 201