"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import router from "next/router"
import { updateBusinessHours } from "@/actions/availability"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"

import { businessHours, type BusinessHours } from "@/db/schema"
import {
  updateBusinessHoursSchema,
  type UpdateBusinessHoursInput,
} from "@/validations/availability"
import { TIME_OPTIONS } from "@/data/constants"

import { toast, useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"

interface BusinessHoursUpdateFormProps {
  currentBusinessHours: BusinessHours | null
}

export function BusinessHoursUpdateForm({
  currentBusinessHours,
}: BusinessHoursUpdateFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<UpdateBusinessHoursInput>({
    resolver: zodResolver(updateBusinessHoursSchema),
    defaultValues: {
      id: currentBusinessHours?.id || "",
      mondayPeriods: currentBusinessHours?.mondayPeriods || [],
      tuesdayPeriods: currentBusinessHours?.tuesdayPeriods || [],
      wednesdayPeriods: currentBusinessHours?.wednesdayPeriods || [],
      thursdayPeriods: currentBusinessHours?.thursdayPeriods || [],
      fridayPeriods: currentBusinessHours?.fridayPeriods || [],
      saturdayPeriods: currentBusinessHours?.saturdayPeriods || [],
      sundayPeriods: currentBusinessHours?.sundayPeriods || [],
    },
  })

  function onSubmit(formData: UpdateBusinessHoursInput) {
    React.startTransition(async () => {
      try {
        const message = await updateBusinessHours({
          ...formData,
        })

        switch (message) {
          case "success":
            toast({
              title: "Godziny przyjęć zostały zaktualizowane",
            })
            form.reset()
            router.refresh()
            break
          default:
            toast({
              title: "Coś poszło nie tak",
              description: "Godziny przyjęć nie zostały zaktualizowane",
              variant: "destructive",
            })
        }
      } catch (error) {
        console.error(error)
        toast({
          title: "Coś poszło nie tak",
          description: "Godziny przyjęć nie zostały zaktualizowane",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {/* Monday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Poniedziałek</h3>
          </div>

          {/* Status Select */}
          <FormItem>
            <FormLabel className="text-xs text-primary/90">Status</FormLabel>
            <FormControl>
              <Select
                value={form.watch("mondayPeriods").length > 0 ? "otwarte" : "zamknięte"}
                onValueChange={(value) => {
                  if (value === "zamknięte") {
                    form.setValue("mondayPeriods", []);
                  } else {
                    form.setValue("mondayPeriods", [{ opening: "", closing: "" }]);
                  }
                }}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="zamknięte" className="capitalize">
                      Zamknięte
                    </SelectItem>
                    <SelectItem value="otwarte" className="capitalize">
                      Otwarte
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Conditionally render time inputs when status is "otwarte" */}
          {form.watch("mondayPeriods").length > 0 && (
            <>
              <FormField
                control={form.control}
                name="mondayPeriods.0.opening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Otwarcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem key={option} value={option} className="capitalize">
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mondayPeriods.0.closing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Zamknięcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem key={option} value={option} className="capitalize">
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Tuesday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Wtorek</h3>
          </div>

          {/* Status Select */}
          <FormItem>
            <FormLabel className="text-xs text-primary/90">Status</FormLabel>
            <FormControl>
              <Select
                value={form.watch("tuesdayPeriods").length > 0 ? "otwarte" : "zamknięte"}
                onValueChange={(value) => {
                  if (value === "zamknięte") {
                    form.setValue("tuesdayPeriods", []);
                  } else {
                    form.setValue("tuesdayPeriods", [{ opening: "", closing: "" }]);
                  }
                }}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="zamknięte" className="capitalize">
                      Zamknięte
                    </SelectItem>
                    <SelectItem value="otwarte" className="capitalize">
                      Otwarte
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Conditionally render time inputs when status is "otwarte" */}
          {form.watch("tuesdayPeriods").length > 0 && (
            <>
              <FormField
                control={form.control}
                name="tuesdayPeriods.0.opening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Otwarcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem key={option} value={option} className="capitalize">
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tuesdayPeriods.0.closing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Zamknięcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem key={option} value={option} className="capitalize">
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Wednesday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Środa</h3>
          </div>

          {/* Status Select */}
          <FormItem>
            <FormLabel className="text-xs text-primary/90">Status</FormLabel>
            <FormControl>
              <Select
                value={form.watch("wednesdayPeriods").length > 0 ? "otwarte" : "zamknięte"}
                onValueChange={(value) => {
                  if (value === "zamknięte") {
                    form.setValue("wednesdayPeriods", []);
                  } else {
                    form.setValue("wednesdayPeriods", [{ opening: "", closing: "" }]);
                  }
                }}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="zamknięte" className="capitalize">
                      Zamknięte
                    </SelectItem>
                    <SelectItem value="otwarte" className="capitalize">
                      Otwarte
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Conditionally render time inputs when there are periods */}
          {form.watch("wednesdayPeriods").length > 0 && (
            <>
              <FormField
                control={form.control}
                name="wednesdayPeriods.0.opening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Otwarcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wednesdayPeriods.0.closing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Zamknięcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Thursday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Czwartek</h3>
          </div>

          {/* Status Select */}
          <FormItem>
            <FormLabel className="text-xs text-primary/90">Status</FormLabel>
            <FormControl>
              <Select
                value={form.watch("thursdayPeriods").length > 0 ? "otwarte" : "zamknięte"}
                onValueChange={(value) => {
                  if (value === "zamknięte") {
                    form.setValue("thursdayPeriods", []);
                  } else {
                    form.setValue("thursdayPeriods", [{ opening: "", closing: "" }]);
                  }
                }}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="zamknięte" className="capitalize">
                      Zamknięte
                    </SelectItem>
                    <SelectItem value="otwarte" className="capitalize">
                      Otwarte
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Conditionally render time inputs when there are periods */}
          {form.watch("thursdayPeriods").length > 0 && (
            <>
              <FormField
                control={form.control}
                name="thursdayPeriods.0.opening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Otwarcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thursdayPeriods.0.closing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Zamknięcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Friday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Piątek</h3>
          </div>

          {/* Status Select */}
          <FormItem>
            <FormLabel className="text-xs text-primary/90">Status</FormLabel>
            <FormControl>
              <Select
                value={form.watch("fridayPeriods").length > 0 ? "otwarte" : "zamknięte"}
                onValueChange={(value) => {
                  if (value === "zamknięte") {
                    form.setValue("fridayPeriods", []);
                  } else {
                    form.setValue("fridayPeriods", [{ opening: "", closing: "" }]);
                  }
                }}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="zamknięte" className="capitalize">
                      Zamknięte
                    </SelectItem>
                    <SelectItem value="otwarte" className="capitalize">
                      Otwarte
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Conditionally render time inputs when there are periods */}
          {form.watch("fridayPeriods").length > 0 && (
            <>
              <FormField
                control={form.control}
                name="fridayPeriods.0.opening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Otwarcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fridayPeriods.0.closing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Zamknięcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Saturday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          <div>
            <h3 className="mt-8 font-bold">Sobota</h3>
          </div>

          {/* Status Select */}
          <FormItem>
            <FormLabel className="text-xs text-primary/90">Status</FormLabel>
            <FormControl>
              <Select
                value={form.watch("saturdayPeriods").length > 0 ? "otwarte" : "zamknięte"}
                onValueChange={(value) => {
                  if (value === "zamknięte") {
                    form.setValue("saturdayPeriods", []);
                  } else {
                    form.setValue("saturdayPeriods", [{ opening: "", closing: "" }]);
                  }
                }}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="zamknięte" className="capitalize">
                      Zamknięte
                    </SelectItem>
                    <SelectItem value="otwarte" className="capitalize">
                      Otwarte
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Conditionally render time inputs when there is at least one period */}
          {form.watch("saturdayPeriods").length > 0 && (
            <>
              <FormField
                control={form.control}
                name="saturdayPeriods.0.opening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Otwarcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="saturdayPeriods.0.closing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Zamknięcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Sunday */}
        <div className="grid grid-cols-4 items-center justify-center gap-8">
          {/* Day Label */}
          <div>
            <h3 className="mt-8 font-bold">Niedziela</h3>
          </div>

          {/* Status Select */}
          <FormItem>
            <FormLabel className="text-xs text-primary/90">Status</FormLabel>
            <FormControl>
              <Select
                value={form.watch("sundayPeriods").length > 0 ? "otwarte" : "zamknięte"}
                onValueChange={(value) => {
                  if (value === "zamknięte") {
                    form.setValue("sundayPeriods", []);
                  } else {
                    form.setValue("sundayPeriods", [{ opening: "", closing: "" }]);
                  }
                }}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="zamknięte" className="capitalize">
                      Zamknięte
                    </SelectItem>
                    <SelectItem value="otwarte" className="capitalize">
                      Otwarte
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Time Inputs (conditionally rendered) */}
          {form.watch("sundayPeriods").length > 0 && (
            <>
              <FormField
                control={form.control}
                name="sundayPeriods.0.opening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Otwarcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sundayPeriods.0.closing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-primary/90">Zamknięcie</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Wybierz godzinę" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          <SelectGroup>
                            {(TIME_OPTIONS ?? []).map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="capitalize"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <Button className="mt-4 w-full" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Aktualizuj
          <span className="sr-only">Aktualizuj</span>
        </Button>
      </form>
    </Form>
  )
}
