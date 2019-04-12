<template>
  <div class="has-background-info vertical-nav">
    <ul>
      <li>
        <a href="./"><img src="../../assets/img/logo.png" width="40"></a>
      <li>
        <router-link to="/dashboard">
          <b-icon icon="view-dashboard-outline" size="is-small"></b-icon>
          Dashboard</router-link>
        </li>
      <li><router-link to="/trade">
      <b-icon icon="pulse" size="is-small"></b-icon>
      Trade</router-link></li>
      <li><router-link to="/bot">
      <b-icon icon="camera-timer" size="is-small"></b-icon>
      Bot</router-link></li>
      <li><router-link to="/statistics">
      <b-icon icon="chart-line" size="is-small"></b-icon>
      Statistics</router-link></li>
      <li><router-link to="/settings">
      <b-icon icon="settings-outline" size="is-small"></b-icon>
      Settings</router-link></li>
      <li><router-link to="/help">
      <b-icon icon="help-circle-outline" size="is-small"></b-icon>
      Help</router-link></li>
    </ul>
  </div>
</template>
