"use client";

import StudyFlow from "@/components/widgets/StudyFlow/StudyFlow";
import Todo from "@/components/widgets/Todo/Todo";

export default function TestingPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-gray-800">Testing StudyFlow Widget</h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <StudyFlow />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-8 text-gray-800">Testing Todo Widget</h1>
          <Todo />
        </div>
      </div>
    </div>
  );
}