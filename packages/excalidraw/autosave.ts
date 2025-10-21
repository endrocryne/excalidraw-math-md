/**
 * Autosave functionality using File System Access API
 */

import type { ExcalidrawElement } from "./element/types";
import type { AppState, BinaryFiles } from "./types";
import { serializeAsJSON } from "./data/json";
import { MIME_TYPES } from "./constants";
import { isImageFileHandle } from "./data/blob";

const AUTOSAVE_INTERVAL = 5000; // 5 seconds

let autosaveTimer: number | null = null;
let lastAutosaveTime = 0;

/**
 * Start autosave timer
 */
export const startAutosave = (
  getElements: () => readonly ExcalidrawElement[],
  getAppState: () => AppState,
  getFiles: () => BinaryFiles,
): void => {
  // Clear any existing timer
  stopAutosave();

  autosaveTimer = window.setInterval(async () => {
    const appState = getAppState();
    const fileHandle = appState.fileHandle;

    // Only autosave if we have a file handle (user has opened or saved a file)
    // and it's not an image file handle
    if (!fileHandle || isImageFileHandle(fileHandle)) {
      return;
    }

    try {
      const elements = getElements();
      const files = getFiles();

      // Serialize the data
      const serialized = serializeAsJSON(elements, appState, files, "local");
      const blob = new Blob([serialized], {
        type: MIME_TYPES.excalidraw,
      });

      // Write to the file handle
      // @ts-ignore - FileSystemWritableFileStream is not in all type definitions
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();

      lastAutosaveTime = Date.now();
    } catch (error: any) {
      // Silently fail if we can't autosave (e.g., permission denied)
      // Don't stop the timer - user might grant permission later
      console.warn("Autosave failed:", error);
    }
  }, AUTOSAVE_INTERVAL);
};

/**
 * Stop autosave timer
 */
export const stopAutosave = (): void => {
  if (autosaveTimer !== null) {
    window.clearInterval(autosaveTimer);
    autosaveTimer = null;
  }
};

/**
 * Get the last autosave time
 */
export const getLastAutosaveTime = (): number => {
  return lastAutosaveTime;
};

/**
 * Check if autosave is currently active
 */
export const isAutosaveActive = (): boolean => {
  return autosaveTimer !== null;
};
