
import React from "react";
import { Menu, LogOut, RefreshCcw, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

export default function UserMenu() {
  const handleRefresh = () => {
    toast({ title: "Données actualisées", description: "Vos données ont été rechargées.", variant: "default" });
    window.location.reload();
  };
  const handleExport = () => {
    toast({ title: "Export effectué", description: "Vos données ont été exportées." });
  };
  const handleImport = () => {
    toast({ title: "Import des données", description: "Importez vos données locales (fonction à venir)." });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border mt-2 z-50">
        <DropdownMenuItem onClick={handleRefresh}>
          <RefreshCcw className="w-4 h-4 mr-2 text-blue-500" /> Actualiser
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExport}>
          <Download className="w-4 h-4 mr-2 text-green-500" /> Exporter données
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleImport}>
          <Upload className="w-4 h-4 mr-2 text-indigo-500" /> Importer données
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast({ title: "Déconnexion", description: "Fonction à venir." })}>
          <LogOut className="w-4 h-4 mr-2 text-red-500" /> Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
