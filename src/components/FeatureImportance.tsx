
import React, { useEffect, useRef } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { featureImportances } from '../data/modelData';

const FeatureImportance: React.FC = () => {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Set up intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLDivElement;
            const index = parseInt(target.dataset.index || "0", 10);
            const importance = featureImportances[index].importance;
            
            // Animate the width based on importance
            setTimeout(() => {
              target.style.width = `${importance * 100}%`;
            }, 100 * index); // Stagger the animations
            
            // Unobserve after animation
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all bar elements
    barRefs.current.forEach((bar) => {
      if (bar) observer.observe(bar);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <Card className="glass-card w-full mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">Feature Importance</CardTitle>
        <CardDescription>
          How different factors affect home price
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {featureImportances.map((feature, index) => (
            <div key={feature.feature} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{feature.displayName}</span>
                <span className="text-sm text-muted-foreground">
                  {(feature.importance * 100).toFixed(0)}%
                </span>
              </div>
              <div className="feature-bar">
                <div
                  ref={(el) => (barRefs.current[index] = el)}
                  className="feature-bar-fill"
                  style={{ width: "0%" }}
                  data-index={index}
                />
              </div>
            </div>
          ))}
          
          <p className="text-sm text-muted-foreground mt-6">
            These importance values show which features have the most impact on house price predictions
            according to our machine learning model.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureImportance;
