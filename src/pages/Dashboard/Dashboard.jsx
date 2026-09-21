import { useSelector } from "react-redux";
import { useMemo } from "react";
import InfoBarChart from "../../components/Dashboard/InfoBarChart/InfoBarChart";
import { InfoCard } from "../../components/Dashboard/InfoCard/InfoCard";
import RecentNotesCard from "../../components/Dashboard/RecentNotesCard/RecentNotesCard";
import RecentTasksCard from "../../components/Dashboard/RecentTasksCard/RecentTasksCard";

const Dashboard = () => {
  const notes = useSelector((state) => state.notes.notes);
  const tasks = useSelector((state) => state.tasks.tasks);

  const active_notes_count = notes.filter((n) => !n.archived).length;
  const archived_notes_count = notes.filter((n) => n.archived).length;
  const total_tasks_count = tasks.length;
  const total_progress_count = tasks.filter(
    (n) => n.status == "inprogress",
  ).length;
  const total_complete_count = tasks.filter((n) => n.status == "done").length;
  const total_todo_count = tasks.filter((n) => n.status == "todo").length;

  const InfoCards = useMemo(
    () => [
      {
        cardName: "Total Task",
        cardQuantity: total_tasks_count,
        cardIcon: "task",
        cardIconColor: "#B55D00",
        cardStatus: "4% from last week",
        cardStatusIcon: "arrow_downward",
        cardStatusColor: "#ef4444",
        cardBorder: "#B55D00",
      },
      {
        cardName: "To Do",
        cardQuantity: total_todo_count,
        cardIcon: "task_alt",
        cardIconColor: "#e40808",
        cardStatus: "30% from last week",
        cardStatusIcon: "arrow_upward",
        cardStatusColor: "#16c751",
        cardBorder: "#B55D00",
      },

      {
        cardName: "In Progress",
        cardQuantity: total_progress_count,
        cardIcon: "done_all",
        cardIconColor: "#e9d81a",
        cardStatus: "Active projects",
        cardStatusIcon: "",
        cardStatusColor: "var(--text-primary)",
        cardBorder: "#e9d81a",
      },
      {
        cardName: "Completed",
        cardQuantity: total_complete_count,
        cardIcon: "done_all",
        cardIconColor: "#16A34A",
        cardStatus: "Tasks finished today",
        cardStatusIcon: "",
        cardStatusColor: "var(--text-primary)",
        cardBorder: "#16A34A",
      },
      {
        cardName: "Total Notes",
        cardQuantity: active_notes_count,
        cardIcon: "description",
        cardIconColor: "#6063EE",
        cardStatus: "12% from last week",
        cardStatusIcon: "arrow_upward",
        cardStatusColor: "#16c751",
        cardBorder: "#4f46e5",
      },

      {
        cardName: "Archived",
        cardQuantity: archived_notes_count,
        cardIcon: "done_all",
        cardIconColor: "#af14bd",
        cardStatus: "Active projects",
        cardStatusIcon: "",
        cardStatusColor: "var(--text-primary)",
        cardBorder: "#d42bcc",
      },
    ],
    [
      active_notes_count,
      archived_notes_count,
      total_tasks_count,
      total_progress_count,
      total_complete_count,
      total_todo_count,
    ],
  );
  return (
    <div className="page_body">
      <h1 className="body_title">Dashboard</h1>
      {/* Indo cards */}
      <div className="row">
        {InfoCards.map((data) => (
          <div className="col-md-6 col-xl-4" key={data.cardName}>
            <InfoCard data={data} />
          </div>
        ))}
      </div>
      {/* Recent cards */}
      <div className="row">
        <div className="col-lg-6">
          <RecentTasksCard />
        </div>
        <div className="col-lg-6">
          <RecentNotesCard />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <InfoBarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
