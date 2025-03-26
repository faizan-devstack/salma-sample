"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import { db } from "@/config/db"
import {
  psGetBusinessHours,
  psGetDatesUnavailable,
} from "@/db/prepared-statements/clinic"
import {
  businessHours,
  type BusinessHours,
  type DateUnavailable,
} from "@/db/schema"
import {
  businessHoursSchema,
  updateBusinessHoursSchema,
  type AddBusinessHoursInput,
  type UpdateBusinessHoursInput,
} from "@/validations/availability"

import { generateId } from "@/lib/utils"

export async function addBusinessHours(
  rawInput: AddBusinessHoursInput
): Promise<"invalid-input" | "error" | "success"> {
  try {
    const validatedInput = businessHoursSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const newBusinessHours = await db
      .insert(businessHours)
      .values({
        id: generateId(),
        mondayPeriods: validatedInput.data.mondayPeriods,
        tuesdayPeriods: validatedInput.data.tuesdayPeriods,
        wednesdayPeriods: validatedInput.data.wednesdayPeriods,
        thursdayPeriods: validatedInput.data.thursdayPeriods,
        fridayPeriods: validatedInput.data.fridayPeriods,
        saturdayPeriods: validatedInput.data.saturdayPeriods,
        sundayPeriods: validatedInput.data.sundayPeriods,
      })
      .returning()

    revalidatePath("/admin/przychodnia/godziny")
    revalidatePath("/")

    return newBusinessHours ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("B\u0142\u0105d przy dodawaniu godzin przyj\u0119\u0107")
  }
}

export async function getBusinessHours(): Promise<BusinessHours | null> {
  try {
    noStore()
    let [businessHoursData] = await psGetBusinessHours.execute()

    if (!businessHoursData) {
      const newBusinessHours = await addBusinessHours({
        mondayPeriods: [],
        tuesdayPeriods: [],
        wednesdayPeriods: [],
        thursdayPeriods: [],
        fridayPeriods: [],
        saturdayPeriods: [],
        sundayPeriods: [],
      })

      if (newBusinessHours === "success") {
        ;[businessHoursData] = await psGetBusinessHours.execute()
      }
    }

    return businessHoursData || null
  } catch (error) {
    console.error(error)
    throw new Error("B\u0142\u0105d przy pobieraniu godzin przyj\u0119\u0107")
  }
}

export async function updateBusinessHours(
  rawInput: UpdateBusinessHoursInput
): Promise<"invalid-input" | "error" | "success"> {
  try {
    const validatedInput = updateBusinessHoursSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const businessHoursUpdated = await db
      .update(businessHours)
      .set({
        mondayPeriods: validatedInput.data.mondayPeriods,
        tuesdayPeriods: validatedInput.data.tuesdayPeriods,
        wednesdayPeriods: validatedInput.data.wednesdayPeriods,
        thursdayPeriods: validatedInput.data.thursdayPeriods,
        fridayPeriods: validatedInput.data.fridayPeriods,
        saturdayPeriods: validatedInput.data.saturdayPeriods,
        sundayPeriods: validatedInput.data.sundayPeriods,
      })
      .where(eq(businessHours.id, validatedInput.data.id))
      .returning()

    revalidatePath("/admin/przychodnia/godziny")

    return businessHoursUpdated ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("B\u0142\u0105d przy aktualizacji godzin przyj\u0119\u0107")
  }
}

export async function getDatesUnavailable(): Promise<DateUnavailable[] | null> {
  try {
    noStore()
    const datesUnavailable = await psGetDatesUnavailable.execute()
    return datesUnavailable ?? null
  } catch (error) {
    console.error(error)
    throw new Error("B\u0142\u0105d wczytywania niedost\u0119pnych termin\u00f3w")
  }
}

export async function getDatesUnavailableAsAnArrayOfDates(): Promise<Date[]> {
  try {
    const datesUnavailableObjects = await psGetDatesUnavailable.execute()
    if (!datesUnavailableObjects) return []

    const datesUnavailable = datesUnavailableObjects.map(
      (dateUnavailable) => new Date(dateUnavailable.date)
    )

    return datesUnavailable ?? []
  } catch (error) {
    console.error(error)
    throw new Error("B\u0142\u0105d wczytywania niedost\u0119pnych termin\u00f3w")
  }
}

export async function addDateUnavailable() {
  // TODO: Implement logic for adding unavailable date
}

export async function updateDateUnavailable() {
  // TODO: Implement logic for updating unavailable date
}

export async function deleteDateUnavailable() {
  // TODO: Implement logic for deleting unavailable date
}