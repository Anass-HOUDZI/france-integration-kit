import React from "react";
import { Menu, LogOut, RefreshCcw, Download, Upload, User, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useI18n } from '@/hooks/useI18n';

export default function UserMenu() {
  const { t } = useI18n();

  const handleRefresh = () => {
    toast({ 
      title: "✅ " + t('user.refresh'), 
      description: t('user.refresh_desc'), 
      variant: "default" 
    });
    window.location.reload();
  };

  const handleExport = () => {
    // Simulation d'export de données
    const data = {
      exportDate: new Date().toISOString(),
      userData: "Sample user data",
      tools: ["letter-generator", "fee-calculator", "budget-calculator"]
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `integration-france-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({ 
      title: "📥 " + t('user.export'), 
      description: t('user.export_desc')
    });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const data = JSON.parse(e.target.result);
            console.log('Imported data:', data);
            toast({ 
              title: "📤 " + t('user.import'), 
              description: t('user.import_desc')
            });
          } catch (error) {
            toast({ 
              title: "❌ " + t('common.error'), 
              description: t('user.import_desc'),
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleProfile = () => {
    toast({ 
      title: "👤 " + t('user.profile'), 
      description: t('user.profile_desc')
    });
  };

  const handleSettings = () => {
    toast({ 
      title: "⚙️ " + t('user.settings'), 
      description: t('user.settings_desc')
    });
  };

  const handleHelp = () => {
    toast({ 
      title: "❓ " + t('user.help'), 
      description: t('user.help_desc')
    });
  };

  const handleLogout = () => {
    toast({ 
      title: "👋 " + t('user.logout'), 
      description: t('user.logout_desc')
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-xl hover:scale-105 transition-all duration-200 bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <User className="h-3 w-3 text-white" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 mt-2 z-50 p-2"
      >
        <DropdownMenuLabel className="text-base font-semibold text-gray-900 dark:text-gray-100 px-3 py-2">
          {t('user.my_account')}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-gray-200/50" />
        
        <DropdownMenuItem 
          onClick={handleProfile}
          className="rounded-xl px-3 py-3 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">{t('user.profile')}</div>
              <div className="text-xs text-gray-500">{t('user.profile_desc')}</div>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={handleSettings}
          className="rounded-xl px-3 py-3 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
              <Settings className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <div className="font-medium">{t('user.settings')}</div>
              <div className="text-xs text-gray-500">{t('user.settings_desc')}</div>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-200/50" />

        <DropdownMenuItem 
          onClick={handleRefresh}
          className="rounded-xl px-3 py-3 hover:bg-green-50 hover:text-green-700 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <RefreshCcw className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="font-medium">{t('user.refresh')}</div>
              <div className="text-xs text-gray-500">{t('user.refresh_desc')}</div>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={handleExport}
          className="rounded-xl px-3 py-3 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
              <Download className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <div className="font-medium">{t('user.export')}</div>
              <div className="text-xs text-gray-500">{t('user.export_desc')}</div>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={handleImport}
          className="rounded-xl px-3 py-3 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Upload className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="font-medium">{t('user.import')}</div>
              <div className="text-xs text-gray-500">{t('user.import_desc')}</div>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-200/50" />

        <DropdownMenuItem 
          onClick={handleHelp}
          className="rounded-xl px-3 py-3 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
              <HelpCircle className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <div className="font-medium">{t('user.help')}</div>
              <div className="text-xs text-gray-500">{t('user.help_desc')}</div>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-200/50" />

        <DropdownMenuItem 
          onClick={handleLogout}
          className="rounded-xl px-3 py-3 hover:bg-red-50 hover:text-red-700 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
              <LogOut className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <div className="font-medium">{t('user.logout')}</div>
              <div className="text-xs text-gray-500">{t('user.logout_desc')}</div>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
