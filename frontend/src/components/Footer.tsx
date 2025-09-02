export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} MindHaven</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  );
}
