
import './UserInfo.css'
export function UserInfo({ user }) {



  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.address}</td>
      <td>{user.role}</td>
      <td>{user.joined}</td>
      <td>{user.joined}</td>
      <td><button className="btn btn-modify">Modify</button></td>
      <td><button className="btn btn-delete">Delete</button></td>
    </tr>
  )

}


export default function UserList() {
  const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      address: "Hyderabad, India",
      role: "Frontend Engineer",
      joined: "Jan 2023",
      status: "Active"
    },

    {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 9123456789",
      address: "Bangalore, India",
      role: "Backend Developer",
      joined: "Mar 2022",
      status: "Inactive"
    }

  ]

  return (
    <div className="user-card">
      <h2>User Information</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Status</th>
            <th>Modify</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => <UserInfo user={user} key={user.email} />)
          }
        </tbody> 
        </table>

    </div>

  )
}