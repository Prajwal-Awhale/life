"use client"

export interface HealthCard {
  id: string
  userId: string
  cardId: string
  fullName: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  allergies: string
  medications: string
  medicalConditions: string
  emergencyContact1Name: string
  emergencyContact1Phone: string
  emergencyContact1Relation: string
  emergencyContact2Name: string
  emergencyContact2Phone: string
  emergencyContact2Relation: string
  doctorName: string
  doctorPhone: string
  insuranceInfo: string
  additionalNotes: string
  plan: "digital" | "physical"
  status: "active" | "pending" | "delivered"
  createdAt: string
  updatedAt: string
  qrCode: string
  address?: any
}

export const cardStorage = {
  saveCard: (card: HealthCard) => {
    const existingCards = cardStorage.getAllCards()
    const updatedCards = existingCards.filter((c) => c.cardId !== card.cardId)
    updatedCards.push(card)
    localStorage.setItem("lifekey_health_cards", JSON.stringify(updatedCards))
  },

  getCard: (cardId: string): HealthCard | null => {
    const cards = cardStorage.getAllCards()
    return cards.find((card) => card.cardId === cardId) || null
  },

  getUserCards: (userId: string): HealthCard[] => {
    const cards = cardStorage.getAllCards()
    return cards.filter((card) => card.userId === userId)
  },

  getAllCards: (): HealthCard[] => {
    if (typeof window === "undefined") return []
    const cards = localStorage.getItem("lifekey_health_cards")
    return cards ? JSON.parse(cards) : []
  },

  updateCard: (cardId: string, updates: Partial<HealthCard>) => {
    const card = cardStorage.getCard(cardId)
    if (card) {
      const updatedCard = { ...card, ...updates, updatedAt: new Date().toISOString() }
      cardStorage.saveCard(updatedCard)
      return updatedCard
    }
    return null
  },

  deleteCard: (cardId: string) => {
    const existingCards = cardStorage.getAllCards()
    const updatedCards = existingCards.filter((c) => c.cardId !== cardId)
    localStorage.setItem("lifekey_health_cards", JSON.stringify(updatedCards))
  },
}
