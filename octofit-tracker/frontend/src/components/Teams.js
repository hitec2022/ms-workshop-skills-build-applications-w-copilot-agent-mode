import { useEffect, useMemo, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiBase = useMemo(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    return codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';
  }, []);

  useEffect(() => {
    async function loadTeams() {
      try {
        console.log('Teams endpoint:', apiBase);
        const response = await fetch(apiBase);
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const data = await response.json();
        const normalizedTeams = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        console.log('Teams API response:', data);
        console.log('Teams normalized items:', normalizedTeams);
        setTeams(normalizedTeams);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, [apiBase]);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
