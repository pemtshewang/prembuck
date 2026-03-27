package handlers

import (
	"backend/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTransactions(c *gin.Context) {
	c.JSON(http.StatusOK, service.Transactions)
}

func GetSubscriptions(c *gin.Context) {
	c.JSON(http.StatusOK, service.Subscriptions)
}

func GetCategoryLimits(c *gin.Context) {
	c.JSON(http.StatusOK, service.CategoryLimits)
}

func GetLiquidity(c *gin.Context) {
	c.JSON(http.StatusOK, service.Liquidity)
}

func GetAnalysis(c *gin.Context) {
	c.JSON(http.StatusOK, service.GetAnalysis())
}
