import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, CheckSquare, Plus, Trash2, Clock } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface PlanningGeneratorToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

type Task = {
  id: string;
  text: string;
  status: "todo" | "in_progress" | "done";
  section: string; // timeline, personal, autre
  due?: Date;
};

type TimelineStep = {
  period: string;
  color: string;
  tasks: string[];
};

const DEFAULT_TIMELINE: TimelineStep[] = [
  {
    period: "Avant toute démarche",
    color: "bg-blue-600",
    tasks: [
      "Lister vos démarches prioritaires",
      "Rassembler vos documents importants",
      "Définir votre calendrier prévisionnel",
      "Repérer les guichets ou sites à contacter"
    ]
  },
  {
    period: "Semaine 1-2",
    color: "bg-green-600",
    tasks: [
      "Envoyer/Remplir les premiers formulaires (CAF, CPAM, Préfecture...)",
      "Prendre rendez-vous administratifs si nécessaire",
      "Photocopier ou numériser vos justificatifs",
      "Mettre à jour votre adresse poste et fournisseurs"
    ]
  },
  {
    period: "Semaine 3-4",
    color: "bg-orange-500",
    tasks: [
      "Faire le suivi des réponses reçues",
      "Préparer vos relances si besoin",
      "Valider les inscriptions ou ouvertures de droits",
      "Planifier les prochaines étapes (emploi/logement/santé/école)"
    ]
  },
  {
    period: "1 à 3 mois",
    color: "bg-purple-600",
    tasks: [
      "Contrôler l’état d’avancement de chaque démarche",
      "Conserver vos récépissés et attestations",
      "Demander des recours en cas de retard/refus",
      "Mettre à jour votre dossier personnel"
    ]
  }
];

function generateInitialTasks(): Task[] {
  // Génère les tâches de base sur la timeline
  const tasks: Task[] = [];
  DEFAULT_TIMELINE.forEach((step, idx) => {
    step.tasks.forEach((txt, i) => {
      tasks.push({
        id: `${idx}-${i}`,
        text: txt,
        status: "todo",
        section: step.period,
      });
    });
  });
  return tasks;
}

const STATUS_LABELS = {
  todo: t('planning.todo'),
  in_progress: t('planning.in_progress'),
  done: t('planning.completed')
};

const STATUS_COLORS = {
  todo: "gray-400",
  in_progress: "blue-500",
  done: "green-600"
};

const PlanningGeneratorTool: React.FC<PlanningGeneratorToolProps> = ({ onBack }) => {
  const { t } = useI18n();
  const [tasks, setTasks] = useState<Task[]>(generateInitialTasks());
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>(DEFAULT_TIMELINE[0].period);

  // Ajout d’une tâche personnalisée dans la section timeline choisie
  function addTask() {
    if (newTaskText.trim().length === 0) return;
    setTasks([
      ...tasks,
      {
        id: `custom-${Date.now()}`,
        text: newTaskText,
        status: "todo",
        section: selectedSection
      }
    ]);
    setNewTaskText("");
  }

  // Statut : todo <-> in_progress <-> done (cercle)
  function toggleStatus(task: Task) {
    const newStatus =
      task.status === "todo"
        ? "in_progress"
        : task.status === "in_progress"
        ? "done"
        : "todo";
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, status: newStatus } : t
      )
    );
  }

  function removeTask(taskId: string) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  // Pour résumé (statistiques)
  const stat = {
    todo: tasks.filter((t) => t.status === "todo").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    done: tasks.filter((t) => t.status === "done").length
  };

  // Liste des périodes/sections
  const allSections = [
    ...DEFAULT_TIMELINE.map(s => s.period),
    ...new Set(tasks.filter(t => t.section && !DEFAULT_TIMELINE.find(d => d.period === t.section)).map(t => t.section))
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common.back')}
      </Button>
      <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
        <Calendar className="h-7 w-7 text-gray-800" />
        {t('planning.title')}
      </h1>
      <p className="text-gray-600 mb-2">
        {t('planning.description')}
      </p>

      {/* Statistiques */}
      <div className="flex gap-2">
        <Badge className="bg-gray-200 text-gray-900">{stat.todo} {t('planning.todo')}</Badge>
        <Badge className="bg-blue-200 text-blue-900">{stat.in_progress} {t('planning.in_progress')}</Badge>
        <Badge className="bg-green-200 text-green-900">{stat.done} {t('planning.completed')}</Badge>
      </div>

      {/* Ajout de tâche personnalisée */}
      <Card>
        <CardHeader>
          <CardTitle>{t('planning.add_task')}</CardTitle>
          <CardDescription>
            {t('planning.personalize_planning')} (<span className="text-blue-700">action administrative, appel, paiement, etc.</span>)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="sectionSelect">{t('planning.category_step')}</Label>
              <select
                id="sectionSelect"
                className="w-full mt-1 rounded-md border px-3 py-2 text-base ring-offset-background focus:ring-2 focus:ring-blue-300 mb-2"
                value={selectedSection}
                onChange={e => setSelectedSection(e.target.value)}
              >
                {allSections.map((sec, i) =>
                  <option key={i} value={sec}>{sec}</option>
                )}
              </select>
            </div>
            <div className="flex-1">
              <Label htmlFor="taskText">{t('planning.new_task')}</Label>
              <Input
                id="taskText"
                value={newTaskText}
                onChange={e => setNewTaskText(e.target.value)}
                placeholder={t('planning.task_placeholder')}
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                className="h-10 rounded-lg bg-blue-600 text-white px-5"
                onClick={addTask}
                disabled={newTaskText.trim().length === 0}
              >
                <Plus className="mr-1" /> {t('planning.add')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline + checklist */}
      <div className="space-y-8">
        {allSections.map((sec, secIdx) => (
          <Card key={sec} className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span
                  className={`w-4 h-4 rounded-full ${DEFAULT_TIMELINE.find(s => s.period === sec)?.color || "bg-slate-300"}`}
                ></span>
                {sec}
              </CardTitle>
              <CardDescription>Tâches prévues pour « {sec} »</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {tasks.filter(t => t.section === sec).length === 0 ? (
                  <div className="text-gray-400 text-sm">
                    {t('planning.no_tasks')}
                  </div>
                ) : (
                  tasks
                    .filter(t => t.section === sec)
                    .map(task => (
                      <div key={task.id} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded group transition-all hover:bg-blue-50">
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Changer l'état"
                          className={`rounded-full border-2 
                            border-${STATUS_COLORS[task.status]} 
                            ${task.status === "done" ? "bg-green-100 text-green-700" : "bg-white text-gray-700"} 
                            mr-1`}
                          onClick={() => toggleStatus(task)}
                        >
                          {task.status === "todo" && <Clock className="w-4 h-4" />}
                          {task.status === "in_progress" && <CheckSquare className="w-4 h-4 text-blue-600" />}
                          {task.status === "done" && <CheckSquare className="w-4 h-4 text-green-600" />}
                        </Button>
                        <span
                          className={`flex-1 text-sm ${task.status === "done" ? "line-through text-gray-400" : ""}`}
                        >
                          {task.text}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {STATUS_LABELS[task.status]}
                        </Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-400 hover:bg-red-100"
                          aria-label="Supprimer"
                          onClick={() => removeTask(task.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanningGeneratorTool;
