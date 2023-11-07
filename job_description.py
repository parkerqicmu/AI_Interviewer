from flask import request, jsonify, Blueprint
import pymongo

job_description_blueprint = Blueprint("job_description", __name__)

@job_description_blueprint.route('/job_description', methods=['PUT', 'GET'])
def update_job_description():
    if request.method == 'PUT':
        data = request.get_json()  # get the request data in JSON format
        company_name = data.get('company_name')
        company_description = data.get('company_description')
        position_name = data.get('position_name')
        position_responsibility = data.get('position_responsibility')
        position_requirements = data.get('position_requirements')

        # TODO: Perform necessary operations with the data (e.g., save to a database)
        return jsonify({'message': 'Job description updated successfully'}), 200

    elif request.method == 'GET':
        return "TEST for upload job description"

    # return a success response
    return jsonify({'message': 'Job description updated successfully'}), 200