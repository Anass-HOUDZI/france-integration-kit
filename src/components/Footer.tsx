
import React from "react";
import { useI18n } from "@/hooks/useI18n";

const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="w-full mt-12 pb-6 pt-7 text-center bg-white/70 dark:bg-gray-900/60 border-t border-gray-100 dark:border-gray-800 shadow-sm">
      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {t('footer.copyright')} &nbsp;
        <a
          href="https://www.linkedin.com/in/anasshoudzi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
        >
          {t('footer.linkedin')}
        </a>
      </span>
    </footer>
  );
};

export default Footer;
