"use client";

import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Minus,
  Plus,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "../ui/button";

export function EditorToolbar() {
  return (
    <div className="flex items-center gap-2 p-2 bg-neutral-800 border-b border-neutral-700">
      <div className="flex items-center gap-2 pr-4 border-r border-neutral-700">
        <Undo className="w-4 h-4 text-neutral-400" />
        <Redo className="w-4 h-4 text-neutral-400" />
      </div>
      <select className="bg-neutral-800 text-neutral-300 text-sm px-2">
        <option>Arial</option>
      </select>
      <select className="bg-neutral-800 text-neutral-300 text-sm px-2">
        <option>Normal text</option>
      </select>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Minus className="w-4 h-4 text-neutral-400" />
        </Button>
        <span className="text-neutral-300">16</span>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Plus className="w-4 h-4 text-neutral-400" />
        </Button>
      </div>
      <div className="flex items-center gap-1 border-l border-neutral-700 pl-2">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Bold className="w-4 h-4 text-neutral-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Italic className="w-4 h-4 text-neutral-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Underline className="w-4 h-4 text-neutral-400" />
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <AlignLeft className="w-4 h-4 text-neutral-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <AlignCenter className="w-4 h-4 text-neutral-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <AlignRight className="w-4 h-4 text-neutral-400" />
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <List className="w-4 h-4 text-neutral-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <ListOrdered className="w-4 h-4 text-neutral-400" />
        </Button>
      </div>
    </div>
  );
}
