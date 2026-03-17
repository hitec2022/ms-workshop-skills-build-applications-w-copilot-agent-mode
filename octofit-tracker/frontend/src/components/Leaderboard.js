import { useEffect, useMemo, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiBase = useMemo(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    return codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';
  }, []);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        console.log('Leaderboard endpoint:', apiBase);
        const response = await fetch(apiBase);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        const normalizedEntries = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        console.log('Leaderboard API response:', data);
        console.log('Leaderboard normalized items:', normalizedEntries);
        setEntries(normalizedEntries);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [apiBase]);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.rank}</td>
                <td>{entry.user_name || entry.user_id}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
