package service

import (
	"backend/internal/models"
)

var Transactions = []models.Transaction{
	{ID: "1", Entity: "Apple Store Premium", Category: "Hardware", Date: "Oct 24, 2023", Status: "settled", Amount: -2149.00},
	{ID: "2", Entity: "Vanguard REIT Div", Category: "Investment", Date: "Oct 22, 2023", Status: "settled", Amount: 1280.42},
	{ID: "3", Entity: "Lufthansa Group", Category: "Travel", Date: "Oct 20, 2023", Status: "pending", Amount: -842.10},
	{ID: "4", Entity: "Fine Dining - Zurich", Category: "Lifestyle", Date: "Oct 18, 2023", Status: "settled", Amount: -340.00},
}

var Subscriptions = []models.Subscription{
	{ID: "s1", Name: "Figma Professional", Amount: 15.00, Renewal: "Sep 12", Type: "SaaS"},
	{ID: "s2", Name: "Bloomberg Terminal", Amount: 2400.00, Renewal: "Sep 04", Type: "Market Intelligence"},
	{ID: "s3", Name: "Equinox Destination", Amount: 315.00, Renewal: "Oct 01", Type: "Lifestyle"},
}

var CategoryLimits = []models.CategoryLimit{
	{Category: "Groceries", Limit: 850, Current: 520},
	{Category: "Tech & Gear", Limit: 400, Current: 140},
	{Category: "Dining", Limit: 600, Current: 425},
}

var Liquidity = models.LiquidityOverview{
	TotalNetWorth: 1284092.00,
	Cash:          142000.00,
	Savings:       450230.00,
	Investments:   691862.00,
}

func GetAnalysis() models.AnalysisReport {
	return models.AnalysisReport{
		PredictedBurn:   3434.23,
		SavingsVelocity: 1550.94,
	}
}
