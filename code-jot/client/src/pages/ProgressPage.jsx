import { useEffect, useRef, useState } from "react";
import ProgressBar from "progressbar.js";

const ProgressPage = () => {
    const [tasks, setTasks] = useState([]);
    const progressBarRef = useRef(null);
    const progressRingRef = useRef(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/tasks");
            let data = await response.json();
            setTasks(data);
            updateProgressBar(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const calculateProgress = (tasks) => {
        let completedTasks = tasks.filter(task => task.completed).length;
        return tasks.length > 0 ? completedTasks / tasks.length : 0;
    };

    const countdown = (deadline) => {
        let now = new Date();
        let targetTime = new Date(deadline);

        if (isNaN(targetTime)) return "Invalid Deadline";
        if (targetTime < now) return "Deadline Finished";

        let timeRemaining = targetTime - now;
        let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

        return `${days}d ${hours}h ${minutes}m`;
    };

    const updateProgressBar = (tasks) => {
        let progressValue = calculateProgress(tasks);

        if (!progressBarRef.current && progressRingRef.current) {
            const bar = new ProgressBar.Circle(progressRingRef.current, {
                strokeWidth: 10,
                easing: "easeInOut",
                duration: 1400,
                color: "rgb(128, 0, 128)",
                trailColor: "#ddd",
                trailWidth: 10,
            });
            progressBarRef.current = bar;
            bar.animate(progressValue);
        } else if (progressBarRef.current) {
            progressBarRef.current.set(progressValue);
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            padding: "20px",
            width: "100%"
        }}>
            <h2 style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#333",
                textAlign: "center",
                width: "100%"
            }}>
                Progress Tracker
            </h2>

            {/* Progress Circle */}
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                marginBottom: "20px", 
                position: "relative"
            }}>
                <div ref={progressRingRef} style={{ width: "165px", height: "150px", position: "relative" }}></div>
                
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#333"
                }}>
                    {Math.round(calculateProgress(tasks) * 100)}%
                </div>
            </div>

            {/* Task List */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "600px"
            }}>
                {tasks.map((task, index) => (
                    <div key={index} style={{
                        background: "#fff",
                        padding: "15px",
                        margin: "10px 0",
                        borderRadius: "12px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        textAlign: "center"
                    }}>
                        <strong style={{ color: "#333", fontSize: "16px" }}>{task.text}</strong>
                        <span style={{
                            background: task.completed ? "rgb(0, 128, 0)" : "rgb(128, 0, 128)",
                            color: "#fff",
                            padding: "5px 12px",
                            borderRadius: "10px",
                            fontWeight: "bold",
                            minWidth: "100px",
                            textAlign: "center"
                        }}>
                            {task.completed ? "Completed" : countdown(task.deadline)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressPage;


