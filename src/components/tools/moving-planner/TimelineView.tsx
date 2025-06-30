
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import { MovingTask } from '@/types/movingPlanner';

interface TimelineViewProps {
  tasks: MovingTask[];
  onUpdateTask: (taskId: string, updates: Partial<MovingTask>) => void;
  movingDate: string;
}

const TimelineView: React.FC<TimelineViewProps> = ({ tasks, onUpdateTask, movingDate }) => {
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
  const getTimelineColor = (dueDate: string, completed: boolean) => {
    if (completed) return 'bg-green-500';
    
    const now = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return 'bg-red-500';
    if (daysUntilDue <= 7) return 'bg-orange-500';
    if (daysUntilDue <= 14) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return `En retard de ${Math.abs(daysUntilDue)} jour(s)`;
    if (daysUntilDue === 0) return "Aujourd'hui";
    if (daysUntilDue === 1) return "Demain";
    return `Dans ${daysUntilDue} jour(s)`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Timeline personnalisée - Déménagement le {new Date(movingDate).toLocaleDateString('fr-FR')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedTasks.map((task, index) => (
            <div key={task.id} className="flex gap-4 items-start">
              <div className={`w-4 h-4 ${getTimelineColor(task.dueDate, task.completed)} rounded-full mt-2 flex-shrink-0`}></div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={(checked) => 
                      onUpdateTask(task.id, { completed: checked === true })
                    }
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </h3>
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'Urgent' : task.priority === 'medium' ? 'Important' : 'Normal'}
                      </Badge>
                    </div>
                    
                    <p className={`text-sm text-gray-600 mb-2 ${task.completed ? 'line-through' : ''}`}>
                      {task.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{getDaysRemaining(task.dueDate)}</span>
                      </div>
                      
                      <Badge variant="secondary" className="text-xs">
                        {task.category}
                      </Badge>
                      
                      {task.estimatedCost && (
                        <span className="text-green-600 font-medium">
                          {task.estimatedCost}€
                        </span>
                      )}
                      
                      {new Date(task.dueDate) < new Date() && !task.completed && (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertTriangle className="w-3 h-3" />
                          <span>En retard</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {tasks.filter(t => t.completed).length}
              </div>
              <div className="text-sm text-gray-600">Terminées</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {tasks.filter(t => !t.completed).length}
              </div>
              <div className="text-sm text-gray-600">Restantes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {tasks.filter(t => new Date(t.dueDate) < new Date() && !t.completed).length}
              </div>
              <div className="text-sm text-gray-600">En retard</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Progression</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineView;
