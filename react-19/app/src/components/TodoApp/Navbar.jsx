export function Navbar({ todos }) {
  console.log("Render Navbar")

  return (
    <nav className="nav">
      <div>
        Completed: {todos.filter(todo => todo.completed).length}
      </div>
      <a href="/">Todos</a>
      <a href="/account">Account</a>
    </nav>
  )
}
