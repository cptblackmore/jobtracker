import { FavoritesContext } from '@features/Favorites';
import { useContext, useEffect, useRef, useState } from 'react';
import { fetchFavorites } from '@widgets/FavoritesList';
import { AlertsContext, createAlert } from '@shared/ui';
import axios from 'axios';
import { blurActiveElement, downloadCsvFile, downloadTextFile, uploadJsonFile } from '@shared/lib';
import { downloadJsonFile } from '@shared/lib';
import { vacanciesToCsv, vacanciesToText } from '@entities/Vacancy';

export const useFavoritesActions = (clearDisplayedFavorites: () => void, resetDisplayedFavorites: () => void) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const ariaInformerTextRef = useRef<HTMLParagraphElement>(null); 
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const { alertsStore } = useContext(AlertsContext);
  const { favoritesStore } = useContext(FavoritesContext);
  const controller = new AbortController();
  const signal = controller.signal;

  const handleDeleteFavorites = () => {
    blurActiveElement();
    setModalOpen(false);
    favoritesStore.clearFavorites();
    clearDisplayedFavorites();
  }

  useEffect(() => {
    if (ariaInformerTextRef.current) {
      if (isLoading) {
        ariaInformerTextRef.current.textContent = 'Идёт загрузка';
      } else {
        ariaInformerTextRef.current.textContent = 'Загрузка завершена';
      }
    }
  }, [isLoading]);

  const handleDownloadFavorites = async (format: 'txt' | 'csv') => {
    setIsLoading(true);
    setActiveAction('download-' + format)
    try {
      const favorites = await fetchFavorites(favoritesStore.ids, signal, alertsStore, favoritesStore, setProgress);
      if (format === 'txt') {
        const text = vacanciesToText(favorites);
        downloadTextFile(text, 'favorites');
      } else {
        const csv = vacanciesToCsv(favorites);
        downloadCsvFile(csv, 'favorites');
      }
      setIsLoading(false);
      setActiveAction(null);
    } catch (e) {
      if (axios.isCancel(e)) return;
      setIsLoading(false);
      setActiveAction(null);
    } finally {
      setProgress(0);
    }
  }

  const handleExportFavorites = () => {
    const jsonContent = JSON.stringify(favoritesStore.ids);
    downloadJsonFile(jsonContent, 'favorites');
  }

  const handleImportFavorites = () => {
    uploadJsonFile()
    .then(parsedIds => {
      favoritesStore.addFavorites(parsedIds);
      resetDisplayedFavorites();
    })
    .catch(e => alertsStore.addAlert(createAlert(e.message, 'error')));
  }

  return { 
    modalOpen, 
    setModalOpen, 
    progress, 
    isLoading,
    ariaInformerTextRef,
    activeAction,
    handleDeleteFavorites, 
    handleDownloadFavorites, 
    handleExportFavorites, 
    handleImportFavorites,
    favoritesStore
  }
}
