export default function ListRow({ children }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800 dark:text-gray-200">
      {children}
    </td>
  );
}
