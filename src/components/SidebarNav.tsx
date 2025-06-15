
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  FileText, Home, Briefcase, Heart,
  GraduationCap, Globe, Settings
} from "lucide-react";

interface SidebarNavProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = [
  { id: "admin", label: "Démarches", icon: FileText, color: "text-blue-500" },
  { id: "logement", label: "Logement", icon: Home, color: "text-green-500" },
  { id: "emploi", label: "Emploi", icon: Briefcase, color: "text-purple-500" },
  { id: "sante", label: "Santé", icon: Heart, color: "text-red-500" },
  { id: "education", label: "Éducation", icon: GraduationCap, color: "text-yellow-500" },
  { id: "culture", label: "Culture", icon: Globe, color: "text-indigo-500" },
  { id: "transversal", label: "Transversaux", icon: Settings, color: "text-gray-500" }
];

export default function SidebarNav({ selected, onSelect }: SidebarNavProps) {
  return (
    <Sidebar className="h-full min-h-screen sticky top-0 max-w-[80vw] z-20">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold mb-2">Catégories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map(cat => (
                <SidebarMenuItem key={cat.id}>
                  <SidebarMenuButton
                    className={`flex items-center gap-3 rounded-xl my-0.5 text-sm px-4 py-2 ${selected === cat.id ? "bg-indigo-100 dark:bg-indigo-900/20 font-semibold shadow" : ""}`}
                    onClick={() => onSelect(cat.id)}
                  >
                    <cat.icon className={`w-6 h-6 ${cat.color}`} />
                    <span className="">{cat.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
