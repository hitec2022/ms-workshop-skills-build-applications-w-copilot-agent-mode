import { useEffect, useMemo, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiBase = useMemo(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    return codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/';
  }, []);

  useEffect(() => {
    async function loadUsers() {
      try {
        console.log('Users endpoint:', apiBase);
        const response = await fetch(apiBase);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        const normalizedUsers = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        console.log('Users API response:', data);
        console.log('Users normalized items:', normalizedUsers);
        setUsers(normalizedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [apiBase]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
              <th>Power</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.team_name || user.team_id}</td>
                <td>{user.power_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
