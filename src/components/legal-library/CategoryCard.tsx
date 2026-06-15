
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CategoryCardProps {
  title: string;
  description: string;
  path: string;
  count?: number;
  icon?: React.ReactNode;
  tags?: string[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  path,
  count,
  icon,
  tags
}) => {
  return (
    <Card className="overflow-hidden border-t-4 border-t-legal-primary hover:shadow-lg transition-shadow">
      <CardHeader className="bg-slate-50 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          {count !== undefined && (
            <Badge variant="outline" className="bg-legal-primary text-white">
              {count} entries
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-slate-600">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-slate-100">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-slate-50 flex justify-end pt-3">
        <Link 
          to={path}
          className="text-legal-burgundy hover:text-legal-primary font-medium"
        >
          Browse Collection →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;