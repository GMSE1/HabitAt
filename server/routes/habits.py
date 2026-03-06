from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import db
from models import Habit

habits_bp = Blueprint("habits", __name__)

@habits_bp.route("/habits", methods=["GET"])
@jwt_required()
def get_habits():
    user_id = get_jwt_identity()
    habits = Habit.query.filter_by(user_id=int(user_id)).all()
    return jsonify([h.to_dict() for h in habits]), 200


@habits_bp.route("/habits", methods=["POST"])
@jwt_required()
def create_habit():
    user_id = get_jwt_identity()
    data = request.get_json()
    name = data.get("name")
    description = data.get("description", "")

    if not name:
        return jsonify({"error": "Habit name is required"}), 400

    habit = Habit(name=name, description=description, user_id=int(user_id))
    db.session.add(habit)
    db.session.commit()
    return jsonify(habit.to_dict()), 201


@habits_bp.route("/habits/<int:id>", methods=["PATCH"])
@jwt_required()
def update_habit(id):
    user_id = get_jwt_identity()
    habit = db.session.get(Habit, id)

    if not habit or habit.user_id != int(user_id):
        return jsonify({"error": "Habit not found or unauthorized"}), 404

    data = request.get_json()
    habit.name = data.get("name", habit.name)
    habit.description = data.get("description", habit.description)
    db.session.commit()
    return jsonify(habit.to_dict()), 200


@habits_bp.route("/habits/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_habit(id):
    user_id = get_jwt_identity()
    habit = db.session.get(Habit, id)

    if not habit or habit.user_id != int(user_id):
        return jsonify({"error": "Habit not found or unauthorized"}), 404

    db.session.delete(habit)
    db.session.commit()
    return jsonify({"message": "Habit deleted successfully"}), 200