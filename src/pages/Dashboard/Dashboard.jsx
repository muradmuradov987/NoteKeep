import { useSelector } from "react-redux";
import InfoBarChart from "../../components/Dashboard/InfoBarChart/InfoBarChart";
import { InfoCard } from "../../components/Dashboard/InfoCard/InfoCard";
import RecentNotesCard from "../../components/Dashboard/RecentNotesCard/RecentNotesCard";
import RecentTasksCard from "../../components/Dashboard/RecentTasksCard/RecentTasksCard";

const Dashboard = () => {
  const notes = useSelector((state) => state.notes.notes);

  const active_notes_count = notes.filter((n) => !n.archived).length;
  const archived_notes_count = notes.filter((n) => n.archived).length;
  const InfoCards = [
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
      cardName: "Total Task",
      cardQuantity: "12",
      cardIcon: "task",
      cardIconColor: "#B55D00",
      cardStatus: "4% from last week",
      cardStatusIcon: "arrow_downward",
      cardStatusColor: "#ef4444",
      cardBorder: "#B55D00",
    },
    {
      cardName: "Completed",
      cardQuantity: "5",
      cardIcon: "done_all",
      cardIconColor: "#16A34A",
      cardStatus: "Tasks finished today",
      cardStatusIcon: "",
      cardStatusColor: "var(--text-primary)",
      cardBorder: "#16A34A",
    },
    {
      cardName: "In Progress",
      cardQuantity: "2",
      cardIcon: "done_all",
      cardIconColor: "#e9d81a",
      cardStatus: "Active projects",
      cardStatusIcon: "",
      cardStatusColor: "var(--text-primary)",
      cardBorder: "#e9d81a",
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
  ];
  return (
    <div className="page_body">
      <h1 className="body_title">Dashboard</h1>
      {/* Indo cards */}
      <div className="row">
        {InfoCards.map((data) => (
          <div className="col-md-6 col-xl-3" key={data.cardName}>
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
