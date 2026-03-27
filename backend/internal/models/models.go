package models

type Transaction struct {
	ID       string  `json:"id"`
	Entity   string  `json:"entity"`
	Category string  `json:"category"`
	Date     string  `json:"date"`
	Status   string  `json:"status"`
	Amount   float64 `json:"amount"`
}

type Account struct {
	Name    string  `json:"name"`
	Type    string  `json:"type"`
	Balance float64 `json:"balance"`
}

type Subscription struct {
	ID      string  `json:"id"`
	Name    string  `json:"name"`
	Amount  float64 `json:"amount"`
	Renewal string  `json:"renewal"`
	Type    string  `json:"type"`
}

type CategoryLimit struct {
	Category string  `json:"category"`
	Limit    float64 `json:"limit"`
	Current  float64 `json:"current"`
}

type LiquidityOverview struct {
	TotalNetWorth float64 `json:"totalNetWorth"`
	Cash          float64 `json:"cash"`
	Savings       float64 `json:"savings"`
	Investments   float64 `json:"investments"`
}

type AnalysisReport struct {
	PredictedBurn   float64 `json:"predictedBurn"`
	SavingsVelocity float64 `json:"savingsVelocity"`
}
