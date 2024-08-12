const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs is-centered">
      <ul>
        {tabs.map((tab) => (
          <li key={tab.label} className={activeTab === tab.label ? 'is-active' : ''}>
            <a onClick={() => onTabChange(tab.label)}>{tab.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default Tabs;

