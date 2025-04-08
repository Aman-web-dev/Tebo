import React from 'react'
import TaskCard from '../components/task-card'
import CommentDialogue from '../components/comment-dialogue';
import { useModal } from '../hooks/useModal';
function Tasks() {

  const {modalOpen} =useModal();

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? {...task, status: newStatus, updatedAt: new Date().toISOString()} 
        : task
    ));
    setStatusEditTask(null);
  };

  const handleAddComment = (taskId) => {
    if (newComment.trim()) {
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? {...task, comments: [...task.comments, newComment], updatedAt: new Date().toISOString()} 
          : task
      ));
      setNewComment("");
    }
  };


  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {tasks.map((task) => (
    <TaskCard
      key={task._id} // Add key prop for React
      task={task}
      handleStatusChange={handleStatusChange}
      handleAddComment={handleAddComment}
    />
  ))}


  {
    modalOpen&&<CommentDialogue/>
  }
</div>
  )
}

export default Tasks



const tasks=[{
  "_id": {
    "$oid": "67f40acaad37b51cb1def0b4"
  },
  "title": "Demo task",
  "description": "Demo task",
  "project": {
    "$oid": "67f404c99b10fad36c08f8d5"
  },
  "assignedTo": {
    "$oid": "67f4033270ecacaf69b85794"
  },
  "status": "done",
  "priority": "high",
  "createdBy": {
    "$oid": "67f4033270ecacaf69b85794"
  },
  "createdAt": {
    "$date": "2025-04-07T17:26:34.335Z"
  },
  "updatedAt": {
    "$date": "2025-04-07T22:59:00.980Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67f458b534bf03d497fdb778"
  },
  "title": "Idk",
  "description": "Idk",
  "project": {
    "$oid": "67f404c99b10fad36c08f8d5"
  },
  "assignedTo": {
    "$oid": "67f4532a34bf03d497fdb6e6"
  },
  "status": "in_progress",
  "priority": "medium",
  "createdBy": {
    "$oid": "67f4033270ecacaf69b85794"
  },
  "createdAt": {
    "$date": "2025-04-07T22:59:01.080Z"
  },
  "updatedAt": {
    "$date": "2025-04-07T22:59:01.080Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67f458f134bf03d497fdb78a"
  },
  "title": "okay",
  "description": "Wow",
  "project": {
    "$oid": "67f41675c2bcf20378bf1bda"
  },
  "assignedTo": {
    "$oid": "67f4533534bf03d497fdb6e8"
  },
  "status": "in_progress",
  "priority": "high",
  "createdBy": {
    "$oid": "67f4033270ecacaf69b85794"
  },
  "createdAt": {
    "$date": "2025-04-07T23:00:01.894Z"
  },
  "updatedAt": {
    "$date": "2025-04-07T23:00:01.894Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67f458f134bf03d497fdb78c"
  },
  "title": "New",
  "description": "89",
  "project": {
    "$oid": "67f41675c2bcf20378bf1bda"
  },
  "assignedTo": {
    "$oid": "67f4533534bf03d497fdb6e8"
  },
  "status": "in_progress",
  "priority": "medium",
  "createdBy": {
    "$oid": "67f4033270ecacaf69b85794"
  },
  "createdAt": {
    "$date": "2025-04-07T23:00:01.965Z"
  },
  "updatedAt": {
    "$date": "2025-04-07T23:00:01.965Z"
  },
  "__v": 0
}]