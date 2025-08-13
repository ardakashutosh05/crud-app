


pipeline {
    agent any
    

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        SONAR_TOKEN = credentials('sonar-token')
        SONAR_ORGANIZATION = 'ardakashutosh05'
        SONAR_PROJECT_KEY = 'ardakashutosh05'
    }

    stages {
        
        stage('Code-Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner \
  -Dsonar.organization= "ardakashutosh05" \
  -Dsonar.projectKey= ardakashutosh05 \
  -Dsonar.sources=. \
  -Dsonar.host.url=https://sonarcloud.io '''
                }
            }
        }
       
        
      
       stage('Docker Build And Push') {
            steps {
                script {
                    docker.withRegistry('', 'docker-cred') {
                        def buildNumber = env.BUILD_NUMBER ?: '1'
                        def image = docker.build("ardakashutosh05/crud-123:latest")
                        image.push()
                    }
                }
            }
        }
    
       
        stage('Deploy To EC2') {
            steps {
                script {
                        sh 'docker rm -f $(docker ps -q) || true'
                        sh 'docker run -d -p 3000:3000 ardakashutosh05/crud-123:latest'
                        
                    
                }
            }
        }
        
}
}
