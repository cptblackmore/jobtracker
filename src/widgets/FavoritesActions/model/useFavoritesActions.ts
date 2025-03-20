import { FavoritesContext } from '@features/Favorites';
import { deleteFromFavoritesLS } from '@features/Favorites/model/deleteFromFavoritesLS';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { fetchFavorites } from '@widgets/FavoritesList';
import { AlertsContext, createAlert } from '@shared/model';
import axios from 'axios';
import { downloadCsvFile, downloadTextFile, uploadJsonFile } from '@shared/lib';
import { addToFavoritesLS } from '@features/Favorites/model/addToFavoritesLS';
import { downloadJsonFile } from '@shared/lib/downloadJsonFile';
import { vacanciesToCsv, vacanciesToText } from '@entities/Vacancy';

export const useFavoritesActions = (ids: string[], setIds: Dispatch<SetStateAction<string[]>>) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { alertsStore } = useContext(AlertsContext);
  const { favoritesStore } = useContext(FavoritesContext);
  const controller = new AbortController();
  const signal = controller.signal;

  const handleDeleteFavorites = () => {
    setModalOpen(false);
    deleteFromFavoritesLS(ids);
    favoritesStore.updateFavorites([]);
    setIds([]);
  }

  const handleDownloadFavorites = async (format: 'txt' | 'csv') => {
    setIsLoading(true);
    try {
      const favorites = await fetchFavorites(favoritesStore.favorites, signal, alertsStore, favoritesStore, setProgress);
      if (format === 'txt') {
        const text = vacanciesToText(favorites);
        downloadTextFile(text, 'favorites');
      } else {
        const csv = vacanciesToCsv(favorites);
        downloadCsvFile(csv, 'favorites');
      }
      setIsLoading(false);
    } catch (e) {
      if (axios.isCancel(e)) return;
      setIsLoading(false);
    } finally {
      setProgress(0);
    }
  }

  const handleExportFavorites = () => {
    const jsonContent = JSON.stringify(ids);
    downloadJsonFile(jsonContent, 'favorites');
  }

  const handleImportFavorites = () => {
    uploadJsonFile().then(parsedIds => {
      for (const id of parsedIds) {
        addToFavoritesLS(id);
      }
      const newIds = [...new Set([...ids, ...parsedIds])]
      favoritesStore.updateFavorites(newIds);
      setIds(newIds);
    }).catch(e => alertsStore.addAlert(createAlert(e.message, 'error')));
  }

  return { 
    modalOpen, 
    setModalOpen, 
    progress, 
    isLoading,
    handleDeleteFavorites, 
    handleDownloadFavorites, 
    handleExportFavorites, 
    handleImportFavorites
  }
}
