import React from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const UserDashboard: React.FC = () => {
  // Dummy data for charts
  const learnerTrafficData = [
    { name: "Page 1", learners: 30 },
    { name: "Page 2", learners: 45 },
    { name: "Page 3", learners: 60 },
    // Add more data as needed
  ];

  const instructorTrafficData = [
    { name: "Page 1", instructors: 20 },
    { name: "Page 2", instructors: 35 },
    { name: "Page 3", instructors: 50 },
    // Add more data as needed
  ];

  const courseSubscriptionData = [
    { name: "Course 1", subscriptions: 15 },
    { name: "Course 2", subscriptions: 25 },
    { name: "Course 3", subscriptions: 35 },
    // Add more data as needed
  ];

  const courseUploadData = [
    { name: "Course 1", uploads: 10 },
    { name: "Course 2", uploads: 20 },
    { name: "Course 3", uploads: 30 },
    // Add more data as needed
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>

      {/* Learner's Traffic Area Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Learner's Traffic</h3>
        <AreaChart
          width={500}
          height={300}
          data={learnerTrafficData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="learners" fill="#82ca9d" />
        </AreaChart>
      </div>

      {/* Instructor's Traffic Line Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Instructor's Traffic</h3>
        <LineChart
          width={500}
          height={300}
          data={instructorTrafficData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="instructors" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Course Subscription Traffic Column Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Course Subscription Traffic
        </h3>
        <BarChart
          width={500}
          height={300}
          data={courseSubscriptionData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="subscriptions" fill="#ffc658" />
        </BarChart>
      </div>

      {/* Course Upload Traffic Bar Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Course Upload Traffic</h3>
        <BarChart
          width={500}
          height={300}
          data={courseUploadData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uploads" fill="#ff7300" />
        </BarChart>
      </div>
    </div>
  );
};

export default UserDashboard;
