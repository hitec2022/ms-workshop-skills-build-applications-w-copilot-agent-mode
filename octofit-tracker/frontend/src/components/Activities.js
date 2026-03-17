import { useEffect, useMemo, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiBase = useMemo(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    return codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';
  }, []);

  useEffect(() => {
    async function loadActivities() {
      try {
        console.log('Activities endpoint:', apiBase);
        const response = await fetch(apiBase);
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        const normalizedActivities = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        console.log('Activities API response:', data);
        console.log('Activities normalized items:', normalizedActivities);
        setActivities(normalizedActivities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, [apiBase]);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.user_name || activity.user_id}</td>
                <td>{activity.activity_type}</td>
                <td>{activity.duration_minutes}</td>
                <td>{activity.calories_burned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
