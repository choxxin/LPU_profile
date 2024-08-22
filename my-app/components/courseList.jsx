import React from "react";

const CourseList = ({ courses }) => {
  return (
    <div className="course-list">
      <h2>Course List</h2>
      <ul>
        {courses
          .filter((course) => course.course_code)
          .map((course, index) => (
            <li key={index} className="course-item">
              <div className="course-details">
                <h3>{course.course_name}</h3>
                <p>
                  <strong>Course Code:</strong> {course.course_code}
                </p>
                <p>
                  <strong>Faculty:</strong> {course.facultyname}
                </p>
                <p>
                  <strong>Credits:</strong> {course.credits}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CourseList;
