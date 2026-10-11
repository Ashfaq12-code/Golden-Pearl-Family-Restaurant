import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <a href="/" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
        <Home className="w-4 h-4" />
      </a>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <a href={item.href} className="text-gray-600 hover:text-orange-600 transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-orange-600 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
