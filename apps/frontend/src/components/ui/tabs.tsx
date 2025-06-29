import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue<T extends string> {
  value: T
  onValueChange: (value: T) => void
}

const TabsContext = React.createContext<TabsContextValue<any> | undefined>(undefined)

const useTabs = <T extends string>() => {
  const context = React.useContext(TabsContext) as TabsContextValue<T>
  if (!context) {
    throw new Error("useTabs must be used within a Tabs component")
  }
  return context
}

interface TabsProps<T extends string> extends React.HTMLAttributes<HTMLDivElement> {
  value: T
  onValueChange: (value: T) => void
}

function Tabs<T extends string>({ className, value, onValueChange, ...props }: TabsProps<T>) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full", className)} {...props} />
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

interface TabsTriggerProps<T extends string> extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: T
}

function TabsTrigger<T extends string>({ className, value, ...props }: TabsTriggerProps<T>) {
  const { value: selectedValue, onValueChange } = useTabs<T>()
  const isSelected = selectedValue === value

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected
          ? "bg-background text-foreground shadow-sm"
          : "hover:bg-background/50",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    />
  )
}

interface TabsContentProps<T extends string> extends React.HTMLAttributes<HTMLDivElement> {
  value: T
}

function TabsContent<T extends string>({ className, value, ...props }: TabsContentProps<T>) {
  const { value: selectedValue } = useTabs<T>()
  
  if (selectedValue !== value) {
    return null
  }

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }