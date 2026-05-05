import { NavLink, Outlet } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "🎓 Students", end: true },
  { to: "/courses", label: "📚 Courses" },
  { to: "/grades", label: "📝 Grades" },
];

function Layout() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <h1>AcadeMate</h1>
          <p>Student Academic Performance Tracker</p>
        </div>
        <nav className="navbar">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " nav-link--active" : "")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
