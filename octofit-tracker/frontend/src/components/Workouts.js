import { useEffect, useMemo, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiBase = useMemo(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    return codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';
  }, []);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        console.log('Workouts endpoint:', apiBase);
        const response = await fetch(apiBase);
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }
        const data = await response.json();
        const normalizedWorkouts = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        console.log('Workouts API response:', data);
        console.log('Workouts normalized items:', normalizedWorkouts);
        setWorkouts(normalizedWorkouts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, [apiBase]);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Recommendation</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <td>{workout.user_name || workout.user_id}</td>
                <td>{workout.recommendation}</td>
                <td>{workout.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
